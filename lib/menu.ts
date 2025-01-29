'use server'

import { apiQuery } from 'next-dato-utils/api';
import { MenuDocument } from '@graphql';

export type MenuItem = {
  id: string,
  title: string,
  slug?: string,
  href?: string,
  sub?: MenuItem[],
}

export type Menu = MenuItem[]

export const buildMenu = async (): Promise<Menu> => {
  const { allAbouts, allEducations, allProjects, allResearches } = await apiQuery<MenuQuery, MenuQueryVariables>(MenuDocument, {
    all: true,
    variables: {
      first: 100,
      skip: 0
    },
    tags: ['about', 'education', 'general', 'project', 'research']
  })

  const menu: Menu = [{
    id: 'about',
    title: 'Om',
    sub: allAbouts.map(({ id, slug, title }) => ({
      id,
      title,
      slug: `/om/${slug}`,
    })),
  }, {
    id: 'education',
    title: 'Utbildning',
    sub: allEducations.map(({ id, slug, title }) => ({
      id,
      title,
      slug: `/utbildning/${slug}`,
    })),
  }, {
    id: 'projects',
    title: 'Projekt',
    sub: [{
      id: 'active',
      title: 'Pågående',
      slug: `/projekt?filter=active`,
    }, {
      id: 'finished',
      title: 'Avslutade',
      slug: `/projekt?filter=finished`,
    }],
  }, {
    id: 'news',
    title: 'Nyheter',
    sub: [{
      id: 'current',
      title: 'Aktuellt',
      slug: `/nyheter`,
    }, {
      id: 'press',
      title: 'Press',
      slug: `/nyheter`,
    }],
  }, {
    id: 'contact',
    title: 'Kontakt',
    sub: [
      { id: 'contact-us', title: 'Kontakta oss', slug: '/kontakt' },
      { id: 'instagram', title: 'Instagram', href: 'https://www.instagram.com/pointofyou' },
      { id: 'facebook', title: 'Facebook', href: 'https://www.facebook.com/pointofyou' },
    ]
  }]
  return menu
}
