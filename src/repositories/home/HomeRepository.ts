import { Model } from 'mongoose';
import logger from 'ylz-logger';

import { Nullable } from '../../libs/Nullable';
import { DuplicateKeyError, ValidationError } from '../../models/errors';
import BaseRepository from '../BaseRepository';
import homeModel from './homeModel';
import IHomeDocument from './IHomeDocument';
import { ICreateInput, IDeleteInput, IGetInput, IListInput, IUpdateInput } from './models';


export default class HomeRepository extends BaseRepository<IHomeDocument, Model<IHomeDocument>> {
   constructor() {
      super(homeModel);
   }


   public list(input: IListInput): Promise<IHomeDocument[]> {
      logger.debug('HomeRepository - list', JSON.stringify(input));

      return super.list(input);
   }
   public async get(input: IGetInput): Promise<Nullable<IHomeDocument>> {
      logger.debug('HomeRepository - get', JSON.stringify(input));

      return super.get(input);
   }

   public async create(input: ICreateInput): Promise<IHomeDocument> {
      logger.debug('HomeRepository - create', JSON.stringify(input));

      try {
         return await super.create(input);
      } catch (err) {
         if (err.code === 11000) {
            throw new DuplicateKeyError('The name is in use!');
         } else if (err.name === ValidationError.name) {
            const data = [];
            for (const e in err.errors) {
               if (err.errors.hasOwnProperty(e)) {
                  const { message, path, value } = err.errors[e];
                  data.push({ message, path, value });
               }
            }
            throw new ValidationError(data);
         } else {
            throw err;
         }
      }
   }
   public update(input: IUpdateInput): Promise<IHomeDocument> {
      logger.debug('HomeRepository - update', JSON.stringify(input));

      return super.update(input);
   }
   public delete(input: IDeleteInput): Promise<IHomeDocument> {
      logger.debug('HomeRepository - delete', JSON.stringify(input));

      return super.delete(input);
   }
}
