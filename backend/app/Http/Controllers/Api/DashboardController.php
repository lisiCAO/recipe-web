<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller {
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService) {
        $this->dashboardService = $dashboardService;
    }

    public function index(): \Illuminate\Http\JsonResponse
    {
        try {
            $dashboardData = $this->dashboardService->getDashboardData();
            return $this->sendResponse($dashboardData, 'Dashboard data retrieved successfully');
        } catch (\Exception $e) {
            Log::error('Failed to retrieve dashboard data: ' . $e->getMessage());
            return $this->sendError('Failed to retrieve dashboard data', [], 500);
        }
    }

}
