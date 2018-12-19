import * as sinon from 'sinon';
import { BlockModel } from '../../src/models/block';
import { TransactionModel } from '../../src/models/transaction';
import { CoinModel } from '../../src/models/coin';
import { WalletAddressModel } from '../../src/models/walletAddress';
import { WalletModel } from '../../src/models/wallet';
import { Storage } from '../../src/services/storage';
import { BaseModel } from '../../src/models/base';

export async function resetDatabase() {
  await resetModel(BlockModel);
  await resetModel(TransactionModel);
  await resetModel(CoinModel);
  await resetModel(WalletAddressModel);
  await resetModel(WalletModel);
}

export async function resetModel(model: BaseModel<any>) {
  return model.collection.deleteMany({});
}

export function mockCollection(toReturn, collectionMethods = {}) {
  const mock = Object.assign(
    {
      find: sinon.stub().returnsThis(),
      sort: sinon.stub().returnsThis(),
      insertOne: sinon.stub().resolves(),
      insertMany: sinon.stub().resolves(),
      remove: sinon.stub().resolves(),
      deleteOne: sinon.stub().resolves(),
      deleteMany: sinon.stub().resolves(),
      limit: sinon.stub().returnsThis(),
      toArray: sinon.stub().resolves([toReturn]),
      findOne: sinon.stub().resolves(toReturn),
      update: sinon.stub().resolves({ result: toReturn }),
      updateOne: sinon.stub().resolves(toReturn),
      updateMany: sinon.stub().resolves({ nModified: 1 }),
      addCursorFlag: sinon.stub().returnsThis()
    },
    collectionMethods
  );
  return mock;
}

export function mockStorage(toReturn, collectionMethods = {}) {
  Storage.db = {
    collection: sinon.stub().returns(mockCollection(toReturn, collectionMethods))
  } as any;
  return Storage;
}
