import { assets } from ".././assets/assets.js"

const Navbar = () => {
    return (
        <div>
            <header className="flex items-center justify-between px-14 py-3 bg-white border-b border-gray-300">
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-orange-700">FoodDelvo</h1>
                    <h5 className="text-black text-sm font-semibold self-end"> Admin Panel</h5>
                </div>
                <img id="profile-pic" className="w-10 h-10 border-orange-600 border-2 rounded-full" src={assets.profile_image} alt="Profile Picture" />
            </header>
        </div>
    )
}

export default Navbar
