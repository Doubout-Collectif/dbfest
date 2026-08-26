import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Événement',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'speakers',
      title: 'Intervenants',
      type: 'string',
    }),
    defineField({
      name: 'schedule',
      title: 'Programme',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'scheduleDay',
          fields: [
            defineField({name: 'date', title: 'Date', type: 'string'}),
            defineField({
              name: 'items',
              title: 'Créneaux',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'scheduleItem',
                  fields: [
                    defineField({name: 'title', title: 'Titre', type: 'string'}),
                    defineField({name: 'time', title: 'Heure', type: 'string'}),
                    defineField({name: 'location', title: 'Lieu', type: 'string'}),
                    defineField({name: 'address', title: 'Adresse', type: 'string'}),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})