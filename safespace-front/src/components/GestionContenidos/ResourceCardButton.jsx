

export default function ResourceCardButton({action, colorInfo, info, icon}){
    return (
      <button
        onClick={action}
        className={`px-4 py-2 w-full max-w-[140px] justify-center rounded-lg hover:cursor-pointer! h-9 ${colorInfo.text} ${colorInfo.bg} ${colorInfo.bgHover} transition-colors flex items-center gap-2`}
      >
        {icon}
        {info}
      </button>
    );

}