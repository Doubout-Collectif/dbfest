import {defineField, defineType} from 'sanity'

export const lineUp = defineType({
  name: 'lineUp',
  title: 'Line Up',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Line Up',
    }),
    defineField({
      name: 'columns',
      title: 'Colonnes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'column',
          fields: [
            defineField({
              name: 'artists',
              title: 'Artistes',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'showIllustration',
              title: 'Afficher illustration',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),
  ],
})