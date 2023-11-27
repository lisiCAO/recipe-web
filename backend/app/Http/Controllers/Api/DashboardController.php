<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;

class DashboardController extends Controller {
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService) {
        $this->dashboardService = $dashboardService;
    }

    public function index(): \Illuminate\Http\JsonResponse
    {
        $dashboardData = $this->dashboardService->getDashboardData();
        return response()->json($dashboardData);
    }


}
