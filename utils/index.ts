import { CarProps, FilterProps } from "@/types";

//THE FUNCTION THAT FETCHES THE CAR API
export async function fetchCars(filters: FilterProps) {
  const {manufacturer, model, limit, fuel, year} = filters
    const headers =  {
		'X-RapidAPI-Key': '4eade30136msh3be1703e54bf54fp161ac9jsn88aaedd7dbbc',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`
    const response = await fetch(url, {headers: headers});
    const result = await response.json();
    return result;
}

//THE FUNCTION THAT CALUCULATES THE RENT
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

//THE FUNCTION THAT FETCHES THE CAR IMAGES
export const generateCarImage = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;
  url.searchParams.append('customer', 'hrjavascript-mastery' || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);
  
  return `${url}`;
}

//THE FUNCTION THAT FETCHS THE NEW PATH NAME
export const updateSearchParams = (type:string, value:string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname;
}