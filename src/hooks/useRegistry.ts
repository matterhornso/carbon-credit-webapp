import { registryCalls } from '../api/registry.api'
import { getLocalItem } from '../utils/Storage'
import { handleApiError } from '../utils/errorHandler'

export function useRegistry() {
  const updateRegistryProjectStatus = async (id: string, projectId: string) => {
    try {
      const registryDetails = {
        ...getLocalItem('userDetails'),
        ...getLocalItem('userDetails2'),
      }
      const payload = {
        _id: id,
        project_id: projectId,
        project_status: 7,
        registry_id: registryDetails?._id,
        registry_name: registryDetails?.fullName,
        registry_address: registryDetails?.address,
        registry_number: registryDetails?.phone.toString(),
      }
      const res = await registryCalls.registryUpdate(payload)
      console.log('payload: ', payload, 'res: ', res)
    } catch (e) {
      handleApiError(e, { action: 'useRegistry.updateRegistryProjectStatus' })
    }
  }

  return { updateRegistryProjectStatus }
}
