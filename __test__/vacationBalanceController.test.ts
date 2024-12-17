import { Request, Response } from 'express';
import VacationBalance from '../models/vacationBalanceModel';
import { 
  getAllVacationBalances, 
  getVacationBalanceById, 
  createVacationBalance, 
  updateVacationBalance, 
  deleteVacationBalance,
  useVacationDays
} from '../controllers/vacationBalanceController';

// Mocks
jest.mock('../models/vacationBalanceModel');

describe('Vacation Balance Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockReq = {
      params: {},
      body: {}
    };

    mockRes = {
      status: mockStatus,
      json: mockJson
    };

    jest.clearAllMocks();
  });

  describe('getAllVacationBalances', () => {
    it('should return all vacation balances', async () => {
      const mockBalances = [
        { id: 1, employeeId: '123', year: 2024 },
        { id: 2, employeeId: '456', year: 2024 }
      ];

      (VacationBalance.findAll as jest.Mock).mockResolvedValue(mockBalances);

      await getAllVacationBalances(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockBalances);
    });

    it('should handle errors when fetching balances', async () => {
      (VacationBalance.findAll as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await getAllVacationBalances(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('getVacationBalanceById', () => {
    it('should return a vacation balance by ID', async () => {
      const mockBalance = { id: '1', employeeId: '123', year: 2024 };
      mockReq.params = { id: '1' };

      (VacationBalance.findByPk as jest.Mock).mockResolvedValue(mockBalance);

      await getVacationBalanceById(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockBalance);
    });

    it('should return 404 if balance not found', async () => {
      mockReq.params = { id: '1' };

      (VacationBalance.findByPk as jest.Mock).mockResolvedValue(null);

      await getVacationBalanceById(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Vacation balance not found' });
    });
  });

  describe('createVacationBalance', () => {
    it('should create a new vacation balance', async () => {
      const mockBalanceData = {
        employeeId: '123',
        year: 2024,
        totalDays: 22,
        usedDays: 0,
        carriedOverDays: 0
      };

      mockReq.body = mockBalanceData;
      const mockCreatedBalance = { id: '1', ...mockBalanceData };

      (VacationBalance.create as jest.Mock).mockResolvedValue(mockCreatedBalance);

      await createVacationBalance(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(mockCreatedBalance);
    });

    it('should handle errors when creating balance', async () => {
      mockReq.body = {};
      (VacationBalance.create as jest.Mock).mockRejectedValue(new Error('Create Error'));

      await createVacationBalance(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid data or request' });
    });
  });

  describe('useVacationDays', () => {
    it('should use vacation days successfully', async () => {
      const mockBalance = {
        id: '1',
        employeeId: '123',
        totalDays: 22,
        usedDays: 5,
        carriedOverDays: 3,
        save: jest.fn().mockResolvedValue(true)
      };

      mockReq.params = { id: '1' };
      mockReq.body = { daysUsed: 3 };

      (VacationBalance.findByPk as jest.Mock).mockResolvedValue(mockBalance);

      await useVacationDays(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        usedDays: 8
      }));
    });

    test('should return error if requested days exceed balance', async () => {
        const mockBalance = {
          id: '1',
          employeeId: '123',
          totalDays: 22,
          usedDays: 20,
          carriedOverDays: 3
        };
      
        mockReq.params = { id: '1' };
        mockReq.body = { daysUsed: 6 };
      
        (VacationBalance.findByPk as jest.Mock).mockResolvedValue(mockBalance);
      
        await useVacationDays(mockReq as Request, mockRes as Response);
      
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
          message: 'The requested days exceed the available balance'
        });
      });
  });
});