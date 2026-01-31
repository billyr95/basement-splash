import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json()

    // Require at least one input
    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone number required' },
        { status: 400 }
      )
    }

    // Validate email format if provided
    if (email && !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address required' },
        { status: 400 }
      )
    }

    // Laylo GraphQL mutation
    const graphqlQuery = `
      mutation($email: String, $phoneNumber: String) {
        subscribeToUser(email: $email, phoneNumber: $phoneNumber)
      }
    `

    const results = {
      email: { synced: false, value: email || null },
      phone: { synced: false, value: phone || null }
    }

    // FIRST CALL: Subscribe with email (if provided)
    if (email) {
      try {
        console.log('📧 Syncing email to Laylo:', email)
        
        const emailResponse = await fetch('https://laylo.com/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LAYLO_API_KEY}`,
          },
          body: JSON.stringify({
            query: graphqlQuery,
            variables: { email: email, phoneNumber: null }
          }),
        })

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text()
          console.error('Laylo email API error:', errorText)
          throw new Error(`Laylo API returned ${emailResponse.status}`)
        }

        const emailData = await emailResponse.json()

        if (emailData.errors) {
          console.error('Laylo email GraphQL errors:', emailData.errors)
          throw new Error(`Laylo GraphQL error: ${JSON.stringify(emailData.errors)}`)
        }

        console.log('✅ Email successfully synced to Laylo')
        results.email.synced = true

      } catch (error) {
        console.error('❌ Error syncing email to Laylo:', error)
      }
    }

    // SECOND CALL: Subscribe with phone (if provided)
    if (phone) {
      try {
        console.log('📱 Syncing phone to Laylo:', phone)
        
        const phoneResponse = await fetch('https://laylo.com/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LAYLO_API_KEY}`,
          },
          body: JSON.stringify({
            query: graphqlQuery,
            variables: { email: null, phoneNumber: phone }
          }),
        })

        if (!phoneResponse.ok) {
          const errorText = await phoneResponse.text()
          console.error('Laylo phone API error:', errorText)
          throw new Error(`Laylo API returned ${phoneResponse.status}`)
        }

        const phoneData = await phoneResponse.json()

        if (phoneData.errors) {
          console.error('Laylo phone GraphQL errors:', phoneData.errors)
          throw new Error(`Laylo GraphQL error: ${JSON.stringify(phoneData.errors)}`)
        }

        console.log('✅ Phone successfully synced to Laylo')
        results.phone.synced = true

      } catch (error) {
        console.error('❌ Error syncing phone to Laylo:', error)
      }
    }

    // Return success if at least one succeeded
    if (results.email.synced || results.phone.synced) {
      return NextResponse.json({ 
        success: true,
        message: 'Successfully subscribed',
        email: results.email,
        phone: results.phone
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error subscribing:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}