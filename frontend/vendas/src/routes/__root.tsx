import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar";
import { Toaster } from '@/components/ui/sonner'


export const Route = createRootRoute({
  component: () => (
    <>
        <SidebarProvider>
            <AppSidebar/>
            <main className="flex-1 w-full p-4">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <Toaster />
    </>
  ),
})
