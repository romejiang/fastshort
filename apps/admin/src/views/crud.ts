import type {
  CreateCrudOptionsRet,
  AddReq,
  DelReq,
  EditReq,
  UserPageQuery,
  UserPageRes,
  CreateCrudOptionsProps
} from '@fast-crud/fast-crud';
import { request } from '@/service/request';

function resHandle(res: any) {
  return res.data;
}

export default function createCrudOptions({ context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const { apiPrefix, columns } = context;
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    const res = await request.post(`${apiPrefix}/list`, query);
    return resHandle(res);
  };
  const editRequest = async (ctx: EditReq) => {
    const { form } = ctx;
    const res = await request.put(`${apiPrefix}/update`, form);
    return resHandle(res);
  };
  const delRequest = async (ctx: DelReq) => {
    const { row } = ctx;
    const res = await request.delete(`${apiPrefix}/${row._id}`);
    return resHandle(res);
  };

  const addRequest = async (req: AddReq) => {
    const { form } = req;
    const res = await request.post(`${apiPrefix}`, form);
    return resHandle(res);
  };

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      columns
    }
  };
}
