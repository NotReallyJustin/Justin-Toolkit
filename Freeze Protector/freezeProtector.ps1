$wshShell = New-Object -ComObject 'wscript.shell'
Write-Output 'Freeze Protector Started'

while ($true) 
{
    Start-Sleep -s 5
    $wshShell.sendkeys('a')
}