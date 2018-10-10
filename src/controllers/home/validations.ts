import { isValidObjectId } from '../../libs/utilities';


/*
* The location of the field, can be one or more of [body, cookies, headers, params, query].
* If omitted, all request locations will be checked
* */
export default Object.freeze({

   // GET /api/homes
   list: {
      limit: {
         in: ['query'],
         isInt: true,
         optional: true,
         toInt: true,
         errorMessage: 'Wrong format'
      },
      skip: {
         in: ['query'],
         isInt: true,
         optional: true,
         toInt: true,
         errorMessage: 'Wrong format'
      }
   },

   // GET /api/homes/:id
   get: {
      id: {
         in: ['query'],
         custom: {
            options: (id, { req }) => isValidObjectId(req.params.id),
            errorMessage: 'Wrong format'
         }
      }
   },

   // POST /api/homes
   create: {
      name: {
         in: ['body'],
         isLength: {
            options: { min: 2 },
            errorMessage: 'Name should be at least 2 chars long'
         },
      },
      address: {
         in: ['body'],
         isLength: {
            options: { min: 5 },
            errorMessage: 'Address should be at least 5 chars long'
         },
      }
   },

   // PUT /api/homes/:id
   update: {
      id: {
         in: ['query'],
         custom: {
            options: (id, { req }) => isValidObjectId(req.params.id),
            errorMessage: 'Wrong format'
         }
      },
      name: {
         in: ['body'],
         isLength: {
            options: { min: 2 },
            errorMessage: 'Name should be at least 2 chars long'
         },
      },
      address: {
         in: ['body'],
         isLength: {
            options: { min: 5 },
            errorMessage: 'Address should be at least 5 chars long'
         },
      }
   },

   // // GET /api/homes/:id
   // delete: {
   //    id: {
   //       in: ['query'],
   //       custom: {
   //          options: (id: string) => {
   //             return isValidObjectId(id);
   //          },
   //       },
   //       errorMessage: 'Wrong format'
   //    }
   // }
});
