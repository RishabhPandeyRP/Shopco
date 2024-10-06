import check from "../assets/icon (1).svg"
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
const Payment = () => {
    const navigate = useNavigate()
    return (
        <div className='w-[100vw] h-[100vh]  border-red-500'>
            <Navbar></Navbar>
            <div className="w-[90%] h-[70%] mx-auto  border-green-500 px-6 py-3 flex flex-col justify-center items-center gap-7">
                <div className="flex flex-col items-center gap-4">
                    <div>
                        <img src={check} alt="" />
                    </div>
                    <div className=" text-[#FF6B00] text-3xl">Your Order has been placed successfully</div>
                </div>
                <div>
                    <button className="px-14 py-2 text-center w-fit mx-auto bg-black text-white border border-black rounded-3xl text-lg" onClick={()=>{return navigate("/dashboard/orders")}}>
                        view orders
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Payment;