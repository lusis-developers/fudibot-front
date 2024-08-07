export const cellphoneRules = [
  {
    validate: (value: string) => value.length >= 10,
    message: 'El número de celular debe tener al menos 10 dígitos 📱'
  },
  {
    validate: (value: string) => /^[0-9]+$/.test(value),
    message: 'El número de celular solo debe contener números 📞'
  }
];

export const emailRules = [
  {
    validate: (value: string) => /\S+@\S+\.\S+/.test(value),
    message: 'El correo electrónico no es válido 😥'
  }
];

export const passwordRules = [
  {
    validate: (value: string) => value.length >= 8,
    message: 'La contraseña debe tener al menos 8 caracteres 😥'
  },
  {
    validate: (value: string) => /[a-z]/.test(value),
    message: 'La contraseña debe contener al menos una letra minúscula (a-z) 😥'
  },
  {
    validate: (value: string) => /[A-Z]/.test(value),
    message: 'La contraseña debe contener al menos una letra mayúscula (A-Z) 😥'
  },
  {
    validate: (value: string) => /\d/.test(value),
    message: 'La contraseña debe contener al menos un número (0-9) 😥'
  },
  {
    validate: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    message: 'La contraseña debe contener al menos un carácter especial (e.g. !@#$%^&*) 😥'
  },
]

export const managerNameRules = [
  {
    validate: (value: string) => value.trim().split(/\s+/).length > 1,
    message: 'El nombre del manager debe contener nombre y apellido 😥'
  }
];

export const websiteOrInstagramRules = [
  {
    validate: (value: string) => value.length > 0,
    message: 'El sitio web o link de tu Instagram no es válido 😥'
  },
  {
    validate: (value: string) => /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)(\.[a-zA-Z]{2,})+/.test(value),
    message: 'El sitio web o link de tu Instagram no es válido 😥'
  }
];


export const productNameRules = [
  {
    validate: (value: string) => value.length > 0,
    message: 'El nombre del producto no puede estar vacío'
  }
];

export const priceRules = [
  {
    validate: (value: string) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value),
    message: 'El precio debe ser un número válido con hasta dos decimales'
  }
];

export const phoneRules = [
  {
    validate: (value: string) => value.length > 9,
    message: 'El número de teléfono debe tener más de 9 dígitos 📞'
  },
  {
    validate: (value: string) => /^[0-9]+$/.test(value),
    message: 'El número de teléfono solo debe contener números 📞'
  }
];

export const rucRules = [
  {
    validate: (value: string) => value.length > 11,
    message: 'El RUC debe tener más de 11 dígitos'
  },
  {
    validate: (value: string) => /^[0-9]+$/.test(value),
    message: 'El RUC solo debe contener números'
  },
  {
    validate: (value: string) => value.endsWith('001'),
    message: 'El RUC debe terminar en 001'
  }
];

export const ciRules = [
  {
    validate: (value: string) => value.length > 8,
    message: 'El CI no parece correcto'
  },
];

export const pagopluxClientIdRules = [
  {
    validate: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
    message: 'El Client ID de PagoPlux solo debe contener caracteres alfanuméricos'
  },
  {
    validate: (value: string) => value.length > 20,
    message: 'El Client ID de PagoPlux debe tener más de 20 dígitos'
  }
];

export const pagopluxSecretKeyRules = [
  {
    validate: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
    message: 'La clave secreta de PagoPlux solo debe contener caracteres alfanuméricos'
  },
  {
    validate: (value: string) => value.length > 35,
    message: 'La clave secreta de PagoPlux debe tener más de 35 caracteres'
  }
];

export const datafastEntityIdRules = [
  {
    validate: (value: string) => /^(\S+)$/.test(value),
    message: 'Ooops parece que algo no está bien en tu entityId'
  },
  {
    validate: (value: string) => value.length > 0,
    message: 'Tú entityId no puede ser vacío'
  },
]

export const datafastBearerTokenRules = [
  {
    validate: (value: string) => /^(\S+)$/.test(value),
    message: 'La clave secreta de PagoPlux solo debe contener caracteres alfanuméricos'
  },
  {
    validate: (value: string) => value.length > 0,
    message: 'Tú bearerToken no puede ser vacío'
  },
]