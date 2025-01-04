export default function PopupNoteInfoFill({popupText}) {
  
  return(
    <div className={`absolute top-1/2 translate-y-[-118px] inset-x-1/2 translate-x-[-165px]`}>
    <div className="w-[330px] h-[236px] bg-red-500 border border-2 border-white rounded-[20px]">
      <div className="w-[270px] mx-[auto] my-[85px]">
        <p className="text-[18px] font-bold text-[#CFCFCF] text-center">
          {popupText}
        </p>
      </div>
    </div>
  </div>
)
};
