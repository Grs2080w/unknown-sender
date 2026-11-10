import DesktopIcons from "../DesktopIcons.jsx";
import EmailApp from "../apps/EmailApp.jsx";
import FilesApp from "../apps/FilesApp.jsx";
import ChatApp from "../apps/ChatApp.jsx";
import Toast from "../Toast.jsx";
import Taskbar from "../Taskbar.jsx";

// Área de trabalho do modo interativo
export default function PlayScreen({ v }) {
  return (
    <>
      <DesktopIcons v={v} />
      {v.showEmail && <EmailApp v={v} />}
      {v.showFiles && <FilesApp v={v} />}
      {v.showChat && <ChatApp v={v} />}
      {v.hasToast && <Toast text={v.toast} />}
      <Taskbar v={v} />
    </>
  );
}
