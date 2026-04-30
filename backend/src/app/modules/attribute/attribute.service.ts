import { Attribute } from '../../../generated/prisma';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { AttributeRepository } from './attribute.repository';
import slugify from 'slugify';

const createAttribute = async (payload: any): Promise<Attribute> => {
  const isExists = await AttributeRepository.checkExists(payload.name);
  if (isExists) {
    throw new ApiError(httpStatus.CONFLICT, 'Attribute name already exists', [
      { field: 'name', message: 'Attribute name already exists' }
    ]);
  }

  if (!payload.slug) {
    payload.slug = slugify(payload.name, { lower: true });
  }

  // Handle values
  const attributeData = {
    ...payload,
    values: {
      create: payload.values.map((v: any) => ({
        value: v.value,
        slug: slugify(v.value, { lower: true }),
        sortOrder: v.sortOrder || 0,
      })),
    },
  };

  return await AttributeRepository.create(attributeData);
};

const getAllAttributes = async (filters: any, options: any) => {
  return await AttributeRepository.getAll(filters, options);
};

const getAttributeById = async (id: string): Promise<Attribute | null> => {
  const result = await AttributeRepository.getById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  }
  return result;
};

const updateAttribute = async (id: string, payload: any): Promise<Attribute> => {
  const isAttributeExists = await AttributeRepository.getById(id);
  if (!isAttributeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  }

  if (payload.name) {
    const isNameExists = await AttributeRepository.checkExists(payload.name, id);
    if (isNameExists) {
      throw new ApiError(httpStatus.CONFLICT, 'Attribute name already exists', [
        { field: 'name', message: 'Attribute name already exists' }
      ]);
    }
    if (!payload.slug) {
      payload.slug = slugify(payload.name, { lower: true });
    }
  }

  // Complex update for values: Delete existing and recreate for simplicity,
  // or perform a diff. For attributes, values are usually few, so recreat is okay
  // or we can use deleteMany + create.
  const { values, ...attributeData } = payload;

  const updateData: any = { ...attributeData };

  if (values) {
    updateData.values = {
      deleteMany: {},
      create: values.map((v: any) => ({
        value: v.value,
        slug: slugify(v.value, { lower: true }),
        sortOrder: v.sortOrder || 0,
      })),
    };
  }

  return await AttributeRepository.update(id, updateData);
};

const deleteAttribute = async (id: string): Promise<Attribute> => {
  const isExists = await AttributeRepository.getById(id);
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  }
  
  // Check if used in products? (TODO: Add check if needed)
  
  return await AttributeRepository.deleteById(id);
};

const checkName = async (name: string): Promise<{ exists: boolean }> => {
  const exists = await AttributeRepository.checkExists(name);
  return { exists };
};

export const AttributeService = {
  createAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttribute,
  deleteAttribute,
  checkName,
};
