function DataDebugger(data: any) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export { DataDebugger };
