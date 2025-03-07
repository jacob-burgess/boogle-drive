/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HostImport } from './routes/host'
import { Route as DriveRouteImport } from './routes/drive/route'
import { Route as IndexImport } from './routes/index'
import { Route as DriveIndexImport } from './routes/drive/index'

// Create/Update Routes

const HostRoute = HostImport.update({
  id: '/host',
  path: '/host',
  getParentRoute: () => rootRoute,
} as any)

const DriveRouteRoute = DriveRouteImport.update({
  id: '/drive',
  path: '/drive',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DriveIndexRoute = DriveIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DriveRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/drive': {
      id: '/drive'
      path: '/drive'
      fullPath: '/drive'
      preLoaderRoute: typeof DriveRouteImport
      parentRoute: typeof rootRoute
    }
    '/host': {
      id: '/host'
      path: '/host'
      fullPath: '/host'
      preLoaderRoute: typeof HostImport
      parentRoute: typeof rootRoute
    }
    '/drive/': {
      id: '/drive/'
      path: '/'
      fullPath: '/drive/'
      preLoaderRoute: typeof DriveIndexImport
      parentRoute: typeof DriveRouteImport
    }
  }
}

// Create and export the route tree

interface DriveRouteRouteChildren {
  DriveIndexRoute: typeof DriveIndexRoute
}

const DriveRouteRouteChildren: DriveRouteRouteChildren = {
  DriveIndexRoute: DriveIndexRoute,
}

const DriveRouteRouteWithChildren = DriveRouteRoute._addFileChildren(
  DriveRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/drive': typeof DriveRouteRouteWithChildren
  '/host': typeof HostRoute
  '/drive/': typeof DriveIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/host': typeof HostRoute
  '/drive': typeof DriveIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/drive': typeof DriveRouteRouteWithChildren
  '/host': typeof HostRoute
  '/drive/': typeof DriveIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/drive' | '/host' | '/drive/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/host' | '/drive'
  id: '__root__' | '/' | '/drive' | '/host' | '/drive/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DriveRouteRoute: typeof DriveRouteRouteWithChildren
  HostRoute: typeof HostRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DriveRouteRoute: DriveRouteRouteWithChildren,
  HostRoute: HostRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/drive",
        "/host"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/drive": {
      "filePath": "drive/route.tsx",
      "children": [
        "/drive/"
      ]
    },
    "/host": {
      "filePath": "host.tsx"
    },
    "/drive/": {
      "filePath": "drive/index.tsx",
      "parent": "/drive"
    }
  }
}
ROUTE_MANIFEST_END */
