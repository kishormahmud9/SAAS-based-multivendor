import { marketingRepository } from './marketing.repository';

const getBanners = async () => {
  return await marketingRepository.getActiveBanners();
};

const getOffers = async () => {
  return await marketingRepository.getActiveOffers();
};

const getUiSettings = async () => {
  return await marketingRepository.getUiSettings();
};

export const marketingServices = {
  getBanners,
  getOffers,
  getUiSettings,
};
