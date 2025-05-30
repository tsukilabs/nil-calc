$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true

Get-ChildItem 'core/pkg' -Recurse | Remove-Item

wasm-pack build core --release

pnpm run -F web build
