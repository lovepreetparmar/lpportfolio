import { Navigate } from 'react-router-dom'

export function LabRedirect() {
  return <Navigate to="/experiments" replace />
}
