@echo off
cd /d "C:\Users\breil\Claude\Projects\DebtAngel"
(
echo === remote ===
git remote set-url origin https://github.com/t3kdesigns03/DebtAngel.git
git remote -v
echo === add ===
git add -A
echo === commit ===
git commit -m "Update DebtAngel site"
echo === branch ===
git branch -M main
echo === push ===
git push -u origin main
echo ===DONE===
) > "%~dp0push_log.txt" 2>&1
