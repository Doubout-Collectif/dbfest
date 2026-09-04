import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Lien',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'url'},
          },
        },
      ],
    }),
  ],
})
