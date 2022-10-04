import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

const vouchers = [
  {
    id: 1,
    storeId: 'blablablablablabla',
    name: 'Focus Paper Refill',
    city: 'Eindhoven',
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
    city: 'Eindhoven',
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
    city: 'Eindhoven',
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
    city: 'Tilburg',
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
    city: 'Tilburg',
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
    city: 'Tilburg',
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

// Define a type for the slice state
interface voucherSearchState {
  keyword: string;
  city: string;
  category: string;
  page: number;
  limit: number;
  offset: number;
  vouchers: any;
}

// Define the initial state using that type
const initialState: voucherSearchState = {
  keyword: '',
  city: 'Eindhoven',
  category: 'Wellness',
  page: 1,
  limit: 20,
  offset: 0,
  vouchers: [...vouchers],
};

export const voucherSearchSlice = createSlice({
  name: 'customer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSearchInput: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    switchCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    switchCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    switchPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.offset = (action.payload - 1) * state.limit;
    },
  },
});

export const { updateSearchInput, switchCity, switchCategory } =
  voucherSearchSlice.actions;

export const selectCategory = (state: RootState) =>
  state.customerFilter.category;
export const selectCity = (state: RootState) => state.customerFilter.city;
export const selectLimit = (state: RootState) => state.customerFilter.limit;

export default voucherSearchSlice.reducer;
