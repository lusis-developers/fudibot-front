import { reactive } from 'vue';

export const form = reactive({
  companyName: '',
  website: '',
  logo: ''
});

export const formFields: { label: string; model: keyof typeof form; CrushUpload?: boolean }[] = [
  {
    label: 'Nombre del Restaurante',
    model: 'companyName',
  },
  {
    label: 'Sitio Web',
    model: 'website',
  },
  {
    label: 'Logo',
    model: 'logo',
    CrushUpload: true
  },
];