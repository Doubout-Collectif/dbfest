import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home DBC Fest',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'highlightedRichText',
      title: 'Texte mis en avant',
      type: 'highlightedRichText',
    }),
    defineField({
      name: 'lineUp',
      title: 'Line Up',
      type: 'lineUp',
    }),
    defineField({
      name: 'events',
      title: 'Événements',
      type: 'array',
      of: [{type: 'event'}],
    }),
  ],
})