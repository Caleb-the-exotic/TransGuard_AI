@echo off
echo ==============================================================================
echo   TransGuard AI – Industrial Telemetry & Predictive Platform v3.0
echo ==============================================================================
echo Starting Fastify API Server on port 3001...
start "TransGuard API (Fastify :3001)" cmd /k "cd services\api && npx tsx src\server.ts"

echo Starting Python AI Diagnostic Engine on port 8000...
start "TransGuard AI Engine (:8000)" cmd /k "cd services\ai-engine && python start.py"

echo Starting React Vite Web Dashboard on port 5173...
start "TransGuard Web (Vite :5173)" cmd /k "cd apps\web && npm run dev"

echo.
echo All services launched in separate console windows!
echo - Web Dashboard:  http://localhost:5173
echo - API Server:     http://localhost:3001
echo - AI Engine:      http://localhost:8000
echo.
