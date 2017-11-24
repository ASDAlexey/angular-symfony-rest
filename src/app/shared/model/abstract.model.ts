// https://github.com/Microsoft/TypeScript/issues/5863

// IModelClass is just here to describe an instanciator
// since we can't use typeof T (unfortunately) with
// the generic type system.
interface IModelClass<T extends AbstractModel> {
  new (...a: any[]): T

  // unfortunately, we have to put here again all the typing information
  // of the static members (without static, since we are describing a class, not an instance)

  create<T extends AbstractModel>(this: IModelClass<T>, data): T
}

export abstract class AbstractModel {
  // static createInstanse<T extends ModelFactory>(...data): T {
  //   const t = new this(...data);
  //   return <T>t;
  // }
  static create<T extends AbstractModel>(this, data = null): T {
    return new this(data) // whatever you fancy here
  }
}
