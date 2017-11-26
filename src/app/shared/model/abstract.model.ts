// https://github.com/Microsoft/TypeScript/issues/5863

// IModelClass is just here to describe an instanciator
// since we can't use typeof T (unfortunately) with
// the generic type system.
interface ModelClass<T extends AbstractModel> {
  new (...a: any[]): T

  // unfortunately, we have to put here again all the typing information
  // of the static members (without static, since we are describing a class, not an instance)

  // tslint:disable:no-shadowed-variable
  create<T extends AbstractModel>(this: ModelClass<T>, data): T
}

export abstract class AbstractModel {
  static create<T>(this, data = null): T {
    const t = new this(data);
    return <T>t;
  }
}
