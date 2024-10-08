import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '.'

describe('Router', () => {
  const routerPruebas = createRouter({ history: createWebHistory(), routes })

  it('navegar a home view', async () => {
    await routerPruebas.push({ name: 'home' })
    await routerPruebas.isReady()
    expect(routerPruebas.currentRoute.value.path).toBe('/')
  })
  it('navegar a completed view', async () => {
    await routerPruebas.push({ name: 'completed' })
    await routerPruebas.isReady()
    expect(routerPruebas.currentRoute.value.path).toBe('/tareas-completadas')
  })
  it('navegar a pending view', async () => {
    await routerPruebas.push({ name: 'pending' })
    await routerPruebas.isReady()
    expect(routerPruebas.currentRoute.value.path).toBe('/tareas-pendientes')
  })
})
