import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address required' },
        { status: 400 }
      )
    }

    // Laylo GraphQL mutation
    const graphqlQuery = `
      mutation($email: String) {
        subscribeToUser(email: $email)
      }
    `

    const variables = { email }

    const layloResponse = await fetch('https://laylo.com/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LAYLO_API_KEY}`,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: variables
      }),
    })

    if (!layloResponse.ok) {
      const errorText = await layloResponse.text()
      console.error('Laylo API error:', errorText)
      throw new Error(`Laylo API returned ${layloResponse.status}`)
    }

    const layloData = await layloResponse.json()

    if (layloData.errors) {
      console.error('Laylo GraphQL errors:', layloData.errors)
      throw new Error(`Laylo GraphQL error: ${JSON.stringify(layloData.errors)}`)
    }

    console.log('✅ Successfully subscribed to Laylo:', email)

    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed'
    })

  } catch (error) {
    console.error('Error subscribing:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}