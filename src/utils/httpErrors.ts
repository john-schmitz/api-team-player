export class HTTPClientError extends Error {
  public readonly statusCode!: number;
  public readonly name!: string;

  public constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTP400Error extends HTTPClientError {
  public readonly statusCode = 400;
  public readonly name = 'HTTP400Error';
  public constructor(message: string | object = 'Bad Request') {
    super(message);
  }
}

export class HTTP401Error extends HTTPClientError {
  public readonly statusCode = 401;
  public readonly name = 'HTTP401Error';
  public constructor(message: string | object = 'Unauthorized') {
    super(message);
  }
}

export class HTTP403Error extends HTTPClientError {
  public readonly statusCode = 403;
  public readonly name = 'HTTP403Error';
  public constructor(message: string | object = 'Forbidden') {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  public readonly statusCode = 404;
  public readonly name = 'HTTP404Error';
  public constructor(message: string | object = 'Not found') {
    super(message);
  }
}
