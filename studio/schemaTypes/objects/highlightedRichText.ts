import {defineField, defineType} from 'sanity'

export const highlightedRichText = defineType({
  name: 'highlightedRichText',
  title: 'DBC Fest cest quoi ?',
  type: 'object',
  fields: [
    defineField({
      name: 'texts',
      title: 'Textes',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})