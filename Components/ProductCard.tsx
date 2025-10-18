import Image from "next/image";

interface ProductCardProps {
  title?: string;
  image?: string;
  width?: number;
  isproduct?: boolean;
  mobile?: boolean;
  notProductContent?: React.ReactNode;
}

export const ProductCard = ({
  title,
  image,
  width,
  notProductContent,
  isproduct = true,
  mobile = false,
}: ProductCardProps) => {
  return (
    <>
      {isproduct ? (
        // Product Card
        <div className="bg-[#2c2954] rounded-lg p-4">
          {/* Image placeholder */}
          <div
            className={`bg-gray-300 rounded-lg mb-3 ${
              mobile ? "h-20" : "h-32"
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center">
              <Image
                src={image ?? "/default-image.png"}
                alt={title ?? "Product image"}
                width={308}
                height={163}
                className="object-cover rounded-lg h-full w-full"
              />
            </div>
          </div>

          {/* Title */}
          <h4 className="text-white font-semibold mb-2 text-sm">{title}</h4>

          {/* Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Active
          </button>
        </div>
      ) : (
        // My Team Card
        notProductContent
      )}
    </>
  );
};
