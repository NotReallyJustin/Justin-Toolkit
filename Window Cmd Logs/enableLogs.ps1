#Requires -RunAsAdministrator

# Turns out Windows doesn't log PowerShell or cmd.exe
# This script fixes that so we can actually see what shenanigans are happening on our PC

# Also this is a very useful tool to defeat Ducky Hoster

function Test-RegValue($path, $key)
{
    try 
    {
        return $null -ne (Get-Item -Path $path).GetValue($key)
    }
    catch 
    {
        return $false
    }
    
}

function CreateEnable-KeyValueContent($path, $key)
{
    try 
    {
        if (-Not (Test-Path $path))
        {
            # Consider Out-Null
            New-Item -Path $path
        }

        if (-Not (Test-RegValue $path $key))
        {
            New-ItemProperty -Path $path -Name $key -Value 1 -PropertyType DWORD
        }
        else 
        {
            Set-ItemProperty -Path $path -Name $key -Value 1
        }
    }
    catch 
    {
        throw "Exception: Unable to create KeyValue $key in $path."
    }
}

# Find these in Apps & Services > Microsoft > Windows > PowerShell > Operational
$SCRIPT_LOG_PATH = "HKLM:/SOFTWARE/Policies/Microsoft/Windows/PowerShell/ScriptBlockLogging"
CreateEnable-KeyValueContent $SCRIPT_LOG_PATH "EnableScriptBlockLogging"

# Find in Windows Log > Security. This will show you process command line field of cmdlets
$CMD_LOG_PATH = "HKLM:/Software/Microsoft/Windows/CurrentVersion/Policies/System/Audit"
CreateEnable-KeyValueContent $CMD_LOG_PATH "ProcessCreationIncludeCmdLine_Enabled"

auditpol /set /subcategory:"Process Creation" /success:enable /failure:enable

# Logging is only useful if the logs are actually meaningful
# However, we're disabling failure logging because Chrome, VSC, and Edge are shitty pieces of Software that constantly asks to execute privileged operations
# And then shocker, our system denies them access because Chrome does not need admin perms
# https://learn.microsoft.com/en-us/answers/questions/1468731/excessive-windows-10-audit-failures-from-chrome-ex suggests disabling audit policies and we're not doing that
auditpol /set /category:"Privilege Use" /success:enable /failure:disable