# TransGuard AI – Local Development Runner (PowerShell)
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "  TransGuard AI – Industrial Telemetry & Predictive Platform v3.0" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan

$root = Split-Path -Parent $PSScriptRoot

Write-Host "Launching Fastify API Server on port 3001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\services\api'; npx tsx src\server.ts"

Write-Host "Launching Python AI Engine on port 8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\services\ai-engine'; python start.py"

Write-Host "Launching React Vite Web Dashboard on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\apps\web'; npm run dev"

Write-Host "`nAll 3 TransGuard AI services launched in dedicated windows." -ForegroundColor Yellow
Write-Host "  Dashboard:  http://localhost:5173"
Write-Host "  API Server: http://localhost:3001"
Write-Host "  AI Engine:  http://localhost:8000"
