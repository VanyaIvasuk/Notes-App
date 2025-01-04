import { useState } from "react";
import { BurgerMenuIcon } from "../icons";
import { DelateAcc, LogoutAcc } from "./SignAutorazationMenu";

export default function DropDawnMenu({setChoosedCategory, choosedCategory, setIsLoginFinished}) {
  let [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);
  // let [burgerMenuClickCounter, setBurgerMenuClickCounter] = useState(0)
  let [isCategoryClick, setisCategoryClick] = useState(false)
  function burherMenuHandler(){
    setIsBurgerMenuClicked(!isBurgerMenuClicked) 
    setisCategoryClick(false)
  }
  function choseCategoryButtonHandler(category){
    setChoosedCategory(choosedCategory = category)
    setisCategoryClick(!isCategoryClick)
  }
  function setCategoryClickCounterHandler(){
    setisCategoryClick(!isCategoryClick)
  }

  const handleLogout = async () => {
    try {
      await LogoutAcc();
      alert("Logged out successfully!");
      setIsLoginFinished(false)
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await DelateAcc();
      alert("Account deleted successfully!");
      setIsLoginFinished(false)
    } catch (error) {
      alert(error.message);
    }
  };

  
  return (
    <div>
      <div>
        <button
          className="size-[50px] bg-[#3B3B3B]  dark:bg-[#26B7CD]  rounded-[15px] mr-[25px] flex items-center justify-between"
          onClick={() => {
          burherMenuHandler()
          }}
        >
          <div className="mx-[auto]">
            <BurgerMenuIcon />
          </div>
        </button>
      </div>
        <div  style={{
                        visibility: isBurgerMenuClicked === true ? "visible" : "hidden",
                        opacity: isBurgerMenuClicked === true ? 1 : 0,
                        transform: isBurgerMenuClicked === true ? "translateY(0)" : "translateY(-10px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease"
              }} 
              className="absolute right-[25px] top-[110px] z-[100]  bg-[#3B3B3B]  dark:bg-[#26B7CD]  w-[150px] h-[148px] py-2 text-[17px] gap-[10px] grid gap-[2px] rounded-[15px] ">
                <button className="text-white w-[140px] h-[30px] mx-[auto] rounded-[9px]  hover:bg-[white] hover:text-[#26B7CD] pl-[7px]" onClick={() => {handleLogout()}} >Log out</button>
                <button className="text-white w-[140px] h-[30px] mx-[auto] rounded-[9px]  hover:bg-[white] hover:text-[#26B7CD] pl-[7px]"  onClick={() => {handleDelete()}}>Delate Acc</button>
                <button className="text-white w-[140px] h-[30px] mx-[auto] rounded-[9px]  hover:bg-[white] hover:text-[#26B7CD] pl-[7px]" onClick={() => {setCategoryClickCounterHandler()}}>Set Category</button>
        </div>
        <div  style={{
                        visibility: isCategoryClick === true && isBurgerMenuClicked === true ? "visible" : "hidden",
                        opacity: isCategoryClick === true && isBurgerMenuClicked === true ?   1 : 0,
                        transform: isCategoryClick === true && isBurgerMenuClicked === true ?   "translateY(0)" : "translateY(-10px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease"
              }}
             className="absolute right-[170px] top-[250px] z-[100]  bg-[#3B3B3B]  dark:bg-[#26B7CD]  w-[150px] h-[148px] py-2 text-[17px] gap-[10px] grid gap-[2px] rounded-[15px] ">
          <div onClick={() => {choseCategoryButtonHandler("")}} className=" text-white w-[140px] h-[30px] mx-[auto] rounded-[9px]  hover:bg-white hover:text-black pl-[7px]">
            <button>all categories</button>
          </div>
          <div onClick={() => {choseCategoryButtonHandler("immediate")}} className=" text-[#FF9E9E] w-[140px] h-[30px] mx-[auto] rounded-[9px]  hover:bg-[#FF9E9E] hover:text-white pl-[7px]">
            <button>immediate</button>
          </div>
          <div onClick={() => {choseCategoryButtonHandler("needed")}} className=" text-[#FFF599] w-[140px] h-[30px] mx-[auto] rounded-[9px]  hover:bg-[#FFF599] hover:text-white pl-[7px]">
            <button>needed</button>
          </div>
          <div  onClick={() => {choseCategoryButtonHandler("inplans")}}  className="text-[#91F48F] w-[140px] h-[30px] mx-[auto] rounded-[9px]  hover:bg-[#91F48F] hover:text-white pl-[7px]">
            <button>in palns</button>
          </div>
        </div>
    </div>
  );
}
