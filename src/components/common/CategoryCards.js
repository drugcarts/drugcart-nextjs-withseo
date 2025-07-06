import Image from "next/image";

const CategoryCard = ({ title, imageAlt, imagUrl }) => {
  return (
    <div className="border rounded-lg overflow-hidden text-center p-2 shadow hover:shadow-lg transition">
      <Image
        priority
        src={imagUrl}
        alt={imageAlt}
        className="w-full h-24 object-contain mb-2"
      />
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};

export default CategoryCard;
