<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/schematics-utils](./schematics-utils.md) &gt; [CliConfig](./schematics-utils.cliconfig.md)

## CliConfig interface

<b>Signature:</b>

```typescript
export interface CliConfig 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [$schema](./schematics-utils.cliconfig._schema.md) | <code>string</code> |  |
|  [apps](./schematics-utils.cliconfig.apps.md) | <code>AppConfig[]</code> | Properties of the different applications in this project. |
|  [defaults](./schematics-utils.cliconfig.defaults.md) | <code>{</code><br/><code>        styleExt?: string;</code><br/><code>        poll?: number;</code><br/><code>        lintFix?: boolean;</code><br/><code>        class?: {</code><br/><code>            spec?: boolean;</code><br/><code>        };</code><br/><code>        component?: {</code><br/><code>            flat?: boolean;</code><br/><code>            spec?: boolean;</code><br/><code>            inlineStyle?: boolean;</code><br/><code>            inlineTemplate?: boolean;</code><br/><code>            viewEncapsulation?: ('Emulated' &#124; 'Native' &#124; 'None');</code><br/><code>            changeDetection?: ('Default' &#124; 'OnPush');</code><br/><code>        };</code><br/><code>        directive?: {</code><br/><code>            flat?: boolean;</code><br/><code>            spec?: boolean;</code><br/><code>        };</code><br/><code>        guard?: {</code><br/><code>            flat?: boolean;</code><br/><code>            spec?: boolean;</code><br/><code>        };</code><br/><code>        interface?: {</code><br/><code>            prefix?: string;</code><br/><code>        };</code><br/><code>        module?: {</code><br/><code>            flat?: boolean;</code><br/><code>            spec?: boolean;</code><br/><code>        };</code><br/><code>        pipe?: {</code><br/><code>            flat?: boolean;</code><br/><code>            spec?: boolean;</code><br/><code>        };</code><br/><code>        service?: {</code><br/><code>            flat?: boolean;</code><br/><code>            spec?: boolean;</code><br/><code>        };</code><br/><code>        build?: {</code><br/><code>            sourcemaps?: boolean;</code><br/><code>            baseHref?: string;</code><br/><code>            progress?: boolean;</code><br/><code>            poll?: number;</code><br/><code>            deleteOutputPath?: boolean;</code><br/><code>            preserveSymlinks?: boolean;</code><br/><code>            showCircularDependencies?: boolean;</code><br/><code>            commonChunk?: boolean;</code><br/><code>            namedChunks?: boolean;</code><br/><code>        };</code><br/><code>        serve?: {</code><br/><code>            port?: number;</code><br/><code>            host?: string;</code><br/><code>            ssl?: boolean;</code><br/><code>            sslKey?: string;</code><br/><code>            sslCert?: string;</code><br/><code>            proxyConfig?: string;</code><br/><code>        };</code><br/><code>        schematics?: {</code><br/><code>            collection?: string;</code><br/><code>            newApp?: string;</code><br/><code>        };</code><br/><code>    }</code> | Specify the default values for generating. |
|  [e2e](./schematics-utils.cliconfig.e2e.md) | <code>{</code><br/><code>        protractor?: {</code><br/><code>            config?: string;</code><br/><code>        };</code><br/><code>    }</code> | Configuration for end-to-end tests. |
|  [lint](./schematics-utils.cliconfig.lint.md) | <code>{</code><br/><code>        files?: (string &#124; string[]);</code><br/><code>        project: string;</code><br/><code>        tslintConfig?: string;</code><br/><code>        exclude?: (string &#124; string[]);</code><br/><code>    }[]</code> | Properties to be passed to TSLint. |
|  [packageManager](./schematics-utils.cliconfig.packagemanager.md) | <code>('npm' &#124; 'cnpm' &#124; 'yarn' &#124; 'default')</code> | Specify which package manager tool to use. |
|  [project](./schematics-utils.cliconfig.project.md) | <code>{</code><br/><code>        name?: string;</code><br/><code>        ejected?: boolean;</code><br/><code>    }</code> | The global configuration of the project. |
|  [test](./schematics-utils.cliconfig.test.md) | <code>{</code><br/><code>        karma?: {</code><br/><code>            config?: string;</code><br/><code>        };</code><br/><code>        codeCoverage?: {</code><br/><code>            exclude?: string[];</code><br/><code>        };</code><br/><code>    }</code> | Configuration for unit tests. |
|  [warnings](./schematics-utils.cliconfig.warnings.md) | <code>{</code><br/><code>        hmrWarning?: boolean;</code><br/><code>        nodeDeprecation?: boolean;</code><br/><code>        packageDeprecation?: boolean;</code><br/><code>        versionMismatch?: boolean;</code><br/><code>        typescriptMismatch?: boolean;</code><br/><code>    }</code> | Allow people to disable console warnings. |
