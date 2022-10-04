const vouchers = [
  {
    id: 1,
    storeId: 'blablablablablabla',
    name: 'Focus Paper Refill',
    href: '#',
    price: '$13',
    description: '3 sizes available',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
    imageAlt:
      'Person using a pen to cross a task off a voucherivity paper card.',
  },
  {
    id: 2,
    name: 'Focus Card Holder',
    storeId: 'blablablablablabla',
    href: '#',
    price: '$64',
    description: 'Walnut',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  },
  {
    id: 3,
    name: 'Focus Carry Case',
    storeId: 'blablablablablabla',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 4,
    name: 'Focus Carry Case',
    storeId: 'blablablablablabla',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 5,
    name: 'Focus Carry Case',
    storeId: 'blablablablablabla',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 6,
    name: 'Focus Carry Case',
    storeId: 'blablablablablabla',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  // More vouchers...
];

export default function voucherList() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="vouchers-heading" className="sr-only">
          Voucher
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {vouchers.map((voucher) => (
            <a key={voucher.id} href={voucher.href}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                <img
                  src={voucher.imageSrc}
                  alt={voucher.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{voucher.name}</h3>
                <p>{voucher.price}</p>
              </div>
              <p className="mt-1 text-sm italic text-gray-500">
                {voucher.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
