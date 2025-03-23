import type { Schema, Struct } from '@strapi/strapi';

export interface TariffCost extends Struct.ComponentSchema {
  collectionName: 'components_tariff_costs';
  info: {
    description: '';
    displayName: 'cost';
    icon: 'book';
  };
  attributes: {
    limit: Schema.Attribute.Decimal;
    value: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'tariff.cost': TariffCost;
    }
  }
}
