import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  expandedFolders: string[];
  toggleFolder: (folderId: string) => void;
  expandAll: (folderIds: string[]) => void;
  collapseAll: () => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      expandedFolders: [],
      toggleFolder: (folderId) =>
        set((state) => ({
          expandedFolders: state.expandedFolders.includes(folderId)
            ? state.expandedFolders.filter((id) => id !== folderId)
            : [...state.expandedFolders, folderId],
        })),
      expandAll: (folderIds) => set({ expandedFolders: folderIds }),
      collapseAll: () => set({ expandedFolders: [] }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
)
