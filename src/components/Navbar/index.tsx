import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../../data";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All"); // الافتراضي All
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    if (value === "All") {
      navigate("/"); // إذا اختار All نرجع للصفحة الرئيسية
    } else {
      navigate(`/category/${value}`);
    }
  };

  return (
    <nav className="bg-[#007BFF] shadow-md p-4 ">
      <div className="flex justify-between items-center">
        {/* الشعار */}
        <h1 className="text-2xl font-bold text-[#FFC300]  ">NewsApp</h1>

        {/* قائمة سطح المكتب */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="font-medium text-white hover:text-[#FF007F]"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="font-medium text-white hover:text-[#FF007F] "
          >
            Favorites
          </Link>

          {/* قائمة التصنيفات */}
          <select
            className="bg-white text-gray-500   rounded-md px-2 py-1"
            value={selected}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} className="text-white bg-gray-500  "  value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* زر الهامبرغر للموبايل */}
        <button
          className="md:hidden text-2xl text-white  p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "x" : "☰"}
        </button>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-medium text-white hover:text-[#FF007F]"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className="font-medium text-white hover:text-[#FF007F]"
          >
            Favorites
          </Link>

          <select
            className="bg-white text-gray-500   rounded-md px-2 py-1"
            value={selected}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} className="text-white bg-gray-500 " value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
