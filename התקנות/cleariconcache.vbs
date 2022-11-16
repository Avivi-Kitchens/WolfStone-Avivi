'Clears the icon cache databases to lets Windows rebuild them fresh.
'for Windows Vista, 7, 8 and Windows 10.
'Written by Ramesh Srinivasan.
'Written on Jan 31 2016
'Updated on Apr 01 2016
'Reviewed on May 20 2021
'http://www.winhelponline.com/blog

Option Explicit
Dim WshShell, objFSO, strICPath1, strICPath2, strmsg, rtnStatus, Process, iDirtyFlags, iDirtyFlags2
Const DeleteReadOnly = True
Set WshShell = WScript.CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")
strICPath1 = WshShell.ExpandEnvironmentStrings("%LOCALAPPDATA%")
strICPath2 = strICPath1 & "\Microsoft\Windows\Explorer"

ExitExplorerShell
WScript.Sleep(3000)
ClearIconCache
WScript.Sleep(2000)
StartExplorerShell

Sub ExitExplorerShell()
	strmsg = "Explorer Shell will be terminated now."
	strmsg = strmsg & " Please save all your work and close all programs."
	strmsg = strmsg & "Icon cache may not be cleared if programs are using them. Want to continue?"
	rtnStatus = MsgBox (strmsg, vbYesNo, "Clear the Icon Cache")
	If rtnStatus = vbYes Then
		For Each Process in GetObject("winmgmts:"). _
			ExecQuery ("select * from Win32_Process where name='explorer.exe'")
	   		Process.terminate(1)
		Next
	ElseIf rtnStatus = vbNo Then
		WScript.Quit
	End If
End Sub

Sub StartExplorerShell
	WshShell.Run "explorer.exe"
End Sub

Sub ClearIconCache()
	If (objFSO.FileExists(strICPath1 &"\IconCache.db")) Then
	On Error Resume Next
    	objFSO.DeleteFile strICPath1 &"\IconCache.db", DeleteReadOnly
	On Error Goto 0
    	If Err.Number <> 0 AND Err.Number <> 53 Then
    		iDirtyFlags = 1
    	End If
	End If
		
	If objFSO.FolderExists(strICPath2) Then
	On Error Resume Next
    	objFSO.DeleteFile(strICPath2 & "\icon*.db"), DeleteReadOnly
	On Error Goto 0
    	If Err.Number <> 0 AND Err.Number <> 53 Then
    		iDirtyFlags2 = 1
    	End If    	
	End If

	WshShell.Run "ie4uinit.exe -ClearIconCache"
	WshShell.Run "ie4uinit.exe -show"
End Sub

If iDirtyFlags = 1 Then
	rtnStatus = MsgBox ("Some programs are still using the IconCache.db in LOCALAPPDATA. Close all programs and try again", vbOKonly, "Clear the Icon Cache")
End If

If iDirtyFlags2 = 1 Then
	If iDirtyFlags <> 1  Then
		rtnStatus = MsgBox ("Some programs are still using the cache in Location 2. Close all programs and try again", vbOKOnly, "Clear the Icon Cache")
	End If
End If

If iDirtyFlags = 0 And iDirtyFlags2 = 0 Then
 	MsgBox "Successfully cleared the Icon Caches.", vbOKOnly, "Clear the Icon Cache"
End If

Set WshShell = Nothing
Set objFSO = Nothing