import { createServer, Model, RestSerializer } from 'miragejs';

const items = [
  'Sweatshirt',
  'Running shoes',
  'AirPods',
  'MacBook',
  'iPad',
  'USB-C cable',
  'Lightning cable',
  'Wallet',
  'MagSafe cable',
  'Apple Watch charger',
  'Power brick',
  'Toothbrush',
  'Toothpaste',
  'Deorderant',
  'Backpack',
  'Vitamins',
  'Kindle',
  'Micro-USB cable',
  'Sleep mask',
  'Ear plugs',
  'Face masks',
  'Sony Walkman',
  'Emergency Vegan Bacon',
];

const ApplicationSerializer = RestSerializer.extend({});

export function makeServer({ environment = 'development' }) {
  return createServer({
    environment,

    serializers: {
      application: ApplicationSerializer.extend(),
    },

    models: {
      item: Model,
    },

    routes() {
      this.timing = 2000;
      this.namespace = 'api';

      this.get('items', (schema, request) => {
        return schema.items.all();
      });
      this.post('items', (schema, request) => {
        const newItem = JSON.parse(request.requestBody);
        return schema.notes.create(newItem);
      });
      this.get('items/:id', (schema, request) => {
        const { id: itemId } = request.params;
        return schema.items.find(itemId);
      });
      this.put('items/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const { id: itemId } = request.params;
        const item = schema.items.find(itemId);
        return item.update(newAttrs);
      });
      this.patch('items/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const { id: itemId } = request.params;
        const item = schema.items.find(itemId);
        return item.update(newAttrs);
      });
      this.del('items/:id', (schema, request) => {
        const { id: itemId } = request.params;
        return schema.items.find(itemId).destroy();
      });
    },

    seeds(server) {
      for (const item of items) {
        server.create('item', {
          name: item,
          packed: !!Math.round(Math.random()),
        });
      }
      console.log(server.db.dump());
    },
  });
}
