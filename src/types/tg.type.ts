export interface TdParameters {
    '@type': 'tdParameters'
    use_test_dc: boolean
    api_id: string
    api_hash: string
    system_language_code: string
    device_model: string
    system_version: string
    application_version: number
    use_secret_chats: boolean
    use_message_database: boolean
    use_file_database: boolean
    database_directory: string
    files_directory: string
}
