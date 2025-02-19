import { apiQuery } from 'next-dato-utils/api';
import { MenuDocument } from '@graphql';

export type MenuItem = {
  id: string,
  title: string,
  slug?: string,
  href?: string,
  sub?: MenuItem[],
  hideInDesktop?: boolean,
  hideSub?: boolean
}

export type Menu = MenuItem[]

export const buildMenu = async (): Promise<Menu> => {
  const { allAbouts, allEducations, allResearchCategories } = await apiQuery<MenuQuery, MenuQueryVariables>(MenuDocument, {
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
    slug: '/om',
    sub: allAbouts.map(({ id, slug, title }) => ({
      id,
      title,
      slug: `/om/${slug}`,
    })),
  }, {
    id: 'projects',
    title: 'Projekt',
    slug: '/projekt',
    hideSub: true,
    sub: [
      {
        id: 'all',
        title: 'Alla',
        slug: `/projekt`,
        hideInDesktop: true,
      },
      {
        id: 'active',
        title: 'Pågående',
        slug: `/projekt?filter=active`,
      }, {
        id: 'finished',
        title: 'Avslutade',
        slug: `/projekt?filter=finished`,
      }],
  }, {
    id: 'education',
    title: 'Utbildning',
    slug: '/utbildning',
    sub: allEducations.map(({ id, slug, title }) => ({
      id,
      title,
      slug: `/utbildning/${slug}`,
    })),
  }, {
    id: 'research',
    title: 'Forskning',
    slug: '/forskning',
    sub: [{
      id: 'about-research',
      title: 'Om forskning',
      slug: '/forskning/om'
    }, {
      id: 'knowledge-bank',
      title: 'Kunskapsbank',
      slug: `/forskning/kunskapsbank`,
    }],
  }, {
    id: 'news',
    title: 'Nyheter',
    slug: '/nyheter',
    sub: [{
      id: 'current',
      title: 'Aktuellt',
      slug: `/nyheter/aktuellt`,
    }, {
      id: 'press',
      title: 'Press',
      slug: `/nyheter/press`,
    }],
  }, {
    id: 'contact',
    title: 'Kontakt',
    slug: '/kontakt',
    sub: [
      { id: 'contact-us', title: 'Kontakta oss', slug: '/kontakt' },
      { id: 'instagram', title: 'Instagram', href: 'https://www.instagram.com/pointofyou.se' },
      { id: 'facebook', title: 'Facebook', href: 'https://www.facebook.com/pointofyou' },
    ]
  }]
  return menu
}

export const getSelectedMenuItem = (menu: Menu, pathname: string, qs: string): MenuItem | null => {
  const fullPath = `${pathname}${qs ? `?${qs.toString()}` : ""}`;
  const selectedSubFromPathname = menu
    .map(({ sub }) => sub)
    .flat()
    .find(({ slug }) => fullPath === slug)?.id;
  return menu.find(({ sub }) => sub?.find(({ id }) => id === selectedSubFromPathname)) ?? null;
}